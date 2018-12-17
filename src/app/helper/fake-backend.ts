import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Body } from '@angular/http/src/body';

export function fakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {
        backend.connections.subscribe((connection: MockConnection) => {
            setTimeout(() => {
                if (connection.request.url.endsWith('/api/authenticate') &&
                    connection.request.method === RequestMethod.Post) {
                        let body = JSON.parse(connection.request.getBody());
                        console.log(body);

                        if (body.email === 'mxiaoai@domain.com' && body.password === '1234') {
                            connection.mockRespond(new Response(
                                new ResponseOptions({
                                    status: 200,
                                    body: { login: true, 
                                        user: { username: 'mxiaoai', 
                                            email: 'mxiaoai@domain.com'}
                                    }})
                            ));
                        } else {
                            connection.mockRespond(new Response(
                                new ResponseOptions({
                                    status: 200,
                                    body: { login: false }
                                })
                            ))
                        }
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