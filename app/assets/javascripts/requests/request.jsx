(() => {
  class Requester {
    initialize(type, route, content='application/json') {
      const request = new XMLHttpRequest();
      if (type === 'POST') {
        console.log('bop');
        request.open(type, route, true);
        console.log(request);
      }
      else {
      request.open(type, route);
      }
      request.setRequestHeader('Accept', "text/javascript, text/html, application/xml, text/xml, */*");
      request.setRequestHeader('Content-Type', content);
      request.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      return request;
    }

    delete(route, resolve, reject) {
      const request = this.initialize('DELETE', route);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (request.status === 204 && resolve) {
            resolve();
          }
        }
      };
      request.send();
    }

    get(route, resolve, reject) {
      const request = this.initialize('GET', route);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 && resolve) {
            resolve(JSON.parse(request.response));
          }
        }
      };
      request.send();
    }

    post(route, params, resolve, reject) {
      const request = this.initialize('POST', route, 'application/x-www-form-urlencoded');
      //var params = 'utf8=%E2%9C%93&authenticity_token=H4gA0Kp3s4aG4UVgD1fNeGQenLm2FqrqUUr7JHimP3Y6Un8fQu9noD78OfTjW1GFZDr%2BlT5Ided1xQBd%2BqEFJg%3D%3D&business%5Bemail%5D=user%40name.com&business%5Bpassword%5D=password&business%5Bremember_me%5D=0&commit=Log+in';
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 201 && resolve) {
            debugger;
            console.log(JSON.parse(request.response));
            console.log('hi');
            resolve(JSON.parse(request.response));    
          } else if (reject) {
            console.log(JSON.parse(request.response));
            reject(JSON.parse(request.response));    
          }
        }
      };
      request.send(JSON.stringify(params));
      //request.send(params);
    }

    update(route, params, resolve, reject) {
      const request = this.initialize('PATCH', route);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 201 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject(JSON.parse(request.response));
          }
        }
      };
      request.send(JSON.stringify(params));
    }
  }
  this.Requester = new Requester();

})();
