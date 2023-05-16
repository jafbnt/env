import { cssBundleHref } from "@remix-run/css-bundle";
import {json } from "@remix-run/node";
import type { LinksFunction} from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { TypeOf } from "zod";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];


export function loader(){
  return json({
    ENV:{
      TIMEOUT: ENV.TIMEOUT,
    }
  })
}

export default function App() {

  const {ENV} = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
