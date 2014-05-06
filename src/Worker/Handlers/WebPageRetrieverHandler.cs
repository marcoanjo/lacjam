﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lacjam.Core;
using Lacjam.Worker.Jobs;
using NServiceBus;

namespace Lacjam.Worker.Handlers
{
    public class WebPageRetrieverHandler : HandlerBase<WebPageRetrieverJob>
    {
        public WebPageRetrieverHandler(IBus bus, Runtime.ILogWriter logger) : base(bus, logger)
        {
        }


        public override void Handle(WebPageRetrieverJob message)
        {
            throw new NotImplementedException();
        }
    }
}
