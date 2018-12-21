import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod
} from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

export function fakeBackendFactory(
  backend: MockBackend,
  options: BaseRequestOptions
) {
  backend.connections.subscribe((connection: MockConnection) => {
    setTimeout(() => {
      if (
        connection.request.url.endsWith("/login") &&
        connection.request.method === RequestMethod.Post
      ) {
        let body = JSON.parse(connection.request.getBody());
        // console.log(body);

        if (body.email === "mxiaoai@domain.com" && body.password === "123456") {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: {
                  login: true,
                  user: { username: "mxiaoai", email: "mxiaoai@domain.com" }
                }
              })
            )
          );
        } else {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: {
                  login: false,
                  message: "Invalid username and/or password"
                }
              })
            )
          );
        }
      }

      if (
        connection.request.url.endsWith("/forgetpwd") &&
        connection.request.method === RequestMethod.Post
      ) {
        let body = JSON.parse(connection.request.getBody());
        // console.log(body);
        if (body.email === 'mxiaoai@domain.com') {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: {
                  exist: true,
                  user: { username: "mxiaoai", email: "mxiaoai@domain.com" }
                }
              })
            )
          );
        } else {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: {
                  exist: false
                }
              })
            )
          );
        }
      }
    
    if (
      connection.request.url.endsWith("/resetpwd") &&
      connection.request.method === RequestMethod.Post
    ) {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            status: 200,
            body: {
              res: true
            }
          })
        )
      );
    }

    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};
