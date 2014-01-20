﻿namespace Lacjam.Integration

module CustomJobs =

    open System
    open System.ServiceModel
    open System.Linq
    open System.Runtime.Serialization.Json
    open System.Net.Mail;
    open System.Diagnostics
    open Microsoft.FSharp.Linq
    open Microsoft.FSharp.Data.TypeProviders
    open Newtonsoft.Json
    open HtmlAgilityPack
    open NServiceBus
    open NServiceBus.MessageInterfaces
    open NServiceBus.Mailer
    open log4net
    open Autofac
    open NServiceBus
    open Quartz
    open Quartz.Impl
    open Quartz.Spi
    open Lacjam
    open Lacjam.Core
    open Lacjam.Core.Runtime
    open Lacjam.Core.User
    open Lacjam.Core.Domain
    open Lacjam.Core.Scheduling
    open Lacjam.Integration
    open Lacjam.Core.Utility.Html
     
    [<Serializable>]
    type JiraRoadMapOutputJob() =
        inherit Lacjam.Core.Jobs.JobMessage()
        interface NServiceBus.IMessage


    type JiraRoadMapOutputJobHandler(log : ILogWriter) =
        interface NServiceBus.IHandleMessages<JiraRoadMapOutputJob> with
            member x.Handle(sc) =
                log.Write (LogMessage.Debug(sc.CreatedDate.ToString() + "   " + sc.GetType().ToString()))                    

                try
                    Lacjam.Integration.Jira.outputRoadmap()
                with ex -> log.Write(LogMessage.Error(sc.GetType().ToString(), ex, true)) //Console.WriteLine(html)


    [<Serializable>]
    type SwellNetRatingJob(log:ILogWriter) =
        inherit Lacjam.Core.Jobs.JobMessage()
        do log.Write(Debug("SwellNetRatingJob ctr"))
        interface NServiceBus.IMessage
        interface Quartz.IJob with
            override x.Execute(context) = let fire = Lacjam.Core.Runtime.Ioc.Resolve<IBus>().Send(x).Register(Scheduling.callBackReceiver)
                                          do log.Write(Debug("SwellNetRatingJob fire ------"))
                                          fire |> ignore  
          

    type SwellNetRatingHandler(log : ILogWriter  ,  bus : IBus) =
        interface NServiceBus.IHandleMessages<SwellNetRatingJob> with
            member x.Handle(job) =
                log.Write (LogMessage.Debug(job.CreatedDate.ToString() + "   " + job.GetType().ToString()))                    
                log.Write (LogMessage.Debug(job.Payload))    
                try
                    let doc = new HtmlAgilityPack.HtmlDocument()
                    doc.OptionFixNestedTags<-true;
                    doc.LoadHtml(job.Payload)
                    match doc.ParseErrors with | s -> if (s.Count() > 0) then failwith ("Errors" + doc.ParseErrors.First().ToString()) |> ignore

                    let lastUpdatedSpan = doc.DocumentNode.Descendants().FirstOrDefault(fun d -> d.Attributes.Contains("class") && d.Attributes.Item("class").Value.Contains("views-field views-field-field-surf-report-date") )

                    let lastUpdated = Utility.Html.findNodesByClassName(lastUpdatedSpan, "field-content")  
                    let mutable cleaned = lastUpdated.Value.OwnerNode.InnerText.Replace("am", String.Empty)
                    cleaned <- cleaned.Replace("pm", String.Empty)
                    let dt = cleaned|> System.Convert.ToDateTime
                    log.Write(Debug(dt.ToString()))

                    if (dt.DayOfWeek = System.DateTime.Now.DayOfWeek) then
                        let (ratingSpan:HtmlNode) = doc.DocumentNode.Descendants().FirstOrDefault(fun d -> d.Attributes.Contains("class") && d.Attributes.Item("class").Value.Contains("views-field views-field-field-surf-report-rating") )
                        let rating = findNodesByClassName(ratingSpan, "field-content")
                        log.Write(Debug(cleaned))
                        let jr = new Jobs.JobResult(Guid.NewGuid(),job.Id, true, rating.Value.OwnerNode.InnerText)
                        bus.Reply(jr)
                with ex -> log.Write(LogMessage.Error(job.GetType().ToString(), ex, true)) //Console.WriteLine(html)

