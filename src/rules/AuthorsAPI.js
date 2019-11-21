export default class AuthorAPI {
  static listar(url = null) {
    if (url === null) url = "http://localhost:8000/v1/author/";

    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   resolve({ statusAPI: "error" });
      // }, 2000);

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

  static cadastrarAuthor(dados) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000/v1/author/", {
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

  static deleteAuthor(id) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8000/v1/author/${id}`, {
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

  static editAuthor(author) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8000/v1/author/${author.id}/`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ name: author.name })
      })
        .then(resp => {
          if (resp.ok) {
            console.log(resp);
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
}
