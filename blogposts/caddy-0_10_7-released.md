---
title: Caddy 0.10.7 Released with Secure Forward Proxy Plugin
author: Matt Holt and Sergey Frolov
date: 2017-09-04 08:00:00+00:00
type: post
---

Caddy 0.10.7 was released two Fridays ago. There was no hype or celebration because technically it's a minor release. But this is a landmark release in more than one way. Most notably, a new plugin, http.forwardproxy, is a significant boon to those interested in online privacy and Internet freedom.

First, I want to thank the countless hours of effort that contributors have put into the project and its community. This particular release had 9 contributors to the code base: Simon Lightfoot, Dhananjay Balan, Dusty Doris, Henrique Dias, Mark Severson, Mattias Wadman, Sergey Frolov, Julian Mazzitelli, and Andreas Linz.

And community faithfuls like Francis Lavoie, Toby Allen, and Matthew Fay continue to engage in [issues](https://github.com/mholt/caddy/issues) and [forum posts](https://caddy.community). We hope you'll get involved, too!


## Privacy-Preserving HTTP/2 Forward Proxy

Thanks to the new [forwardproxy plugin](/docs/http.forwardproxy), Caddy can act as a forward HTTPS proxy. To our knowledge, this is first plugin for web servers that supports HTTP/2 and forward proxying at the same time. That's why this plugin has many usability, performance, and privacy features, some of which are unique:

- **HTTP/2.** The new version of HTTP is not only faster than HTTP/1.1, but multiplexed streams make it difficult to reliably profile the behavior characteristics of a connection or user.

- **Probe resistance.** If enabled, the plugin will attempt to hide the fact that Caddy is acting as a forward proxy. When probe resistance is on, the forward proxy behavior should be undetectable unless correct credentials are provided. Optionally, it's possible to specify a secret link which, when visited, will trigger forwardproxy behavior and return HTTP Status 407 Proxy Authentication Required on absent/wrong credentials. The secret link may be used to pop an authentication dialog on clients that can't be configured to pre-send credentials, which includes all browsers without special extensions. (Probe resistance is still experimental! Please help test it.)

- **Basic authentication.** Restrict use of the proxy to only certain authorized users with credentials.

- **IP hiding.** When enabled, Caddy will not pass the client's IP address through to the destination, aiding in preserving privacy.

- **Serves PAC file.** Generate and serve a [Proxy Auto-Config (PAC)](https://en.wikipedia.org/wiki/Proxy_auto-config) file, which is especially convenient for using the proxy without installing additional apps on mobile.

- **Innocuous traffic.** As opposed to VPN/SSH/SOCKS-based proxies, forwardproxy uses the popular, generic HTTPS protocol, which presumably attracts less attention on the wire.

This plugin was designed and written by [Sergey Frolov](https://sfrolov.io/), a student researcher at the University of Colorado Boulder. Because this plugin might have positive implications for the privacy and freedom of potentially many users of the Internet, we wanted this to live in an official Caddy repository. The source code for this plugin can be found [on GitHub](https://github.com/caddyserver/forwardproxy).

You may find ways to configure your web browser to use a forward proxy in [this blog post](https://sfrolov.io/2017/08/secure-web-proxy-client-en).

We hope that many users will be able to deploy forwardproxy and find it helpful in preserving their privacy in hostile network environments.


## Graceful Binary Upgrades

For years now, Caddy has been able to reload reload its configuration with zero downtime upon SIGUSR1, but we hadn't implemented SIGUSR2... until now.

Sending SIGUSR2 to Caddy will invoke a graceful, zero-downtime binary upgrade. Simply replace the binary file on disk and then trigger the upgrade with the signal to apply changes. Unlike SIGUSR1, the Caddyfile will *not* be reloaded, so you can be assured that the same configuration will continue to be used, even if the Caddyfile changed on disk in the meantime.

This is the first major step toward automatic security and stability upgrades. In the future, we'll be designing and testing a system for safely rolling out minor updates to public-facing Caddy instances automatically. We believe this technology will help keep sites on the Web safe and secure as cipher suites are phased in or out, or bugs in the server are found and fixed. We still have some details to work out, but regardless: this won't be deployed until our comprehensive test suite is in place to ensure that upgrades are in fact non-breaking.


## Plan 9 Support

It was easy enough, so why not. Thanks to the Go assembler and a few small tweaks to Caddy's code, you can now run Caddy on Plan 9! (\*Tweee\*)


## Distinguishable Exit Codes

You've all been waiting for it, and finally, Caddy doesn't quit with the same exit code every time. Now, exit code 1 is only emitted if Caddy quits before the servers start listening. In other words, _don't automatically restart after exit code 1_. Caddy doesn't quit once it has started unless there is an intervention from the user, system, or environment; in those cases, Caddy will exit with a status code &gt; 1. The docs [describe the different codes](/docs/cli#exit-codes).


## AWS ES and Jekyll Plugins

Two more plugins are available with this release: [http.awses](/docs/http.awses) and [http.jekyll](/docs/http.jekyll). The AWSES integration makes it easy to proxy requests to AWS ElasticSearch. The Jekyll plugin is like [http.hugo](/docs/http.hugo) but for [Jekyll](https://jekyllrb.com/)!

## Smaller Things

We also fixed a few bugs and the community helped with quite a few little bothersome issues, so this is officially the best release yet! Thanks again to all who helped.

Are you using Caddy? Let the world know! [Tweet](https://twitter.com/caddyserver) about it, we'd love for people to know your experience.
