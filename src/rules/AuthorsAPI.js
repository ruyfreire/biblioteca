export default class AuthorAPI {
  static listar(url = null) {
    if (url === null)
      url = "https://api-bibliotecaruy.herokuapp.com/v1/author/";

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(resp => {
          if (resp.ok) {
            resp.json().then(data => {
              if (data.count === 0) {
                resolve({ statusAPI: "empty" });
              } else {
                resolve({
                  count: data.count,
                  next: data.next,
                  prev: data.previous,
                  authors: data.results,
                  statusAPI: "success"
                });
              }
            });
          } else {
            throw new Error("Erro ao buscar autores da API!");
          }
        })
        .catch(error => {
          console.log(error);
          reject({ statusAPI: "error" });
        });
    });
  }

  static cadastrar(dados) {
    return new Promise((resolve, reject) => {
      fetch("https://api-bibliotecaruy.herokuapp.com/v1/author/", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(dados)
      })
        .then(resp => {
          resp.json().then(data => {
            resolve(data);
          });
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://api-bibliotecaruy.herokuapp.com/v1/author/${id}`, {
        method: "DELETE"
      })
        .then(resp => {
          if (resp.ok) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  static edit(author) {
    return new Promise((resolve, reject) => {
      fetch(`https://api-bibliotecaruy.herokuapp.com/v1/author/${author.id}/`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ name: author.name })
      })
        .then(resp => {
          if (resp.ok) {
            resolve();
          } else {
            reject(resp.statusText);
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  static listarBooks(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://api-bibliotecaruy.herokuapp.com/v1/author/${id}/book/`)
        .then(resp => resp.json())
        .then(data => resolve(data))
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
}
