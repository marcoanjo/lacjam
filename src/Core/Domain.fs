﻿namespace Lacjam.Core.Domain

open Microsoft.FSharp
open Microsoft.FSharp.Collections
open Microsoft.FSharp.Core
open MongoDB.Bson
open MongoDB.Bson.Serialization
open MongoDB.Driver
open System
open System.Collections
open System.Collections.Generic

[<CLIMutable>]
type Audit =
    { mutable Id : MongoDB.Bson.ObjectId;
        AuditType : string;
        Message : string;
        CreatedDate : DateTime }

[<CLIMutable>]
type Setting =
    { mutable Id : MongoDB.Bson.ObjectId;
        Name : string;
        Value : string;
        CreatedDate : DateTime }
           
[<CLIMutable>]
type Email =
        { To : string;
          From : string;
          Subject : string;
          Body : string }

[<CLIMutable>]
type Client =
    { mutable Id : MongoDB.Bson.ObjectId;
        FirstName : string;
        LastName : string;
        CreatedDate : DateTime;
        Email : string;
        Mobile : string;
        Telephone : string }

    type Investor() =
        member val Id = int with get, set
        member val CreatedDate = DateTime.Now with get
        member val GivenName = "" with get, set
        member val Surname = "" with get, set
        member val Title = "" with get, set
        member val IsActive = Boolean() with get, set
        member x.ToString = x.GivenName + " " + x.Surname

    [<CLIMutable>]
    //new() = new Investor()
    type Account =
        { mutable Id : MongoDB.Bson.ObjectId;
          Name : string;
          Url : string;
          CreatedDate : DateTime;
          Investors : seq<Client> }