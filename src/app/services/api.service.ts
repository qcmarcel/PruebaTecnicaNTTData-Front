import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {isKeyOf} from '../helpers/app.helpers';

export let defaultOptions = {
  observe: 'response' as const,
  responseType: 'json' as const,
  params: undefined,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host: string = environment.apiUrl;
  suffix: string | string[] | any | undefined = "";

  constructor(private http: HttpClient) {
    console.debug("environment is production?: ", environment.production);
    this.setHost();
  }

  private setHost() {
    this.host = environment.apiUrl;
  }

  setURL(request_uri: string) {
    let URL: any = this.addPath(this.host);
    const list_of_services: any = environment?.routes ?? {};
    if (isKeyOf(list_of_services, request_uri)) {
      URL += list_of_services[request_uri];
    } else {
      URL = this.addPath(URL, [request_uri]);
    }
    URL = this.addPath(URL, this.suffix);
    return URL;
  }

  private addPath(URL: any, path: string | string[] | any | undefined = environment.path ?? undefined) {
    if (!path) {
      return URL;
    }
    if (path.constructor.name === "Array") {
      if (URL.slice(-1) !== "/") {
        URL += "/";
      }
      URL += path.join("/");
    } else if (typeof path === "object") {
      const params = new URLSearchParams();
      Object.keys(path).map(key => {
        params.append(key, path[key]);
      });
      URL += "?" + params.toString();
    } else if (path.length > 0) {
      URL += path;
    }
    path = "";
    return URL;
  }

  get(uri: any, options = defaultOptions) {
    const observable = this.http.get(this.setURL(uri), options);
    this.setHost();
    return observable;
  }

}
