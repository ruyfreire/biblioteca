export default class BookAPI {
  static listar(url = null) {
    if (url === null) url = "https://api-bibliotecaruy.herokuapp.com/v1/book/";

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
                  books: data.results,
                  statusAPI: "success"
                });
              }
            });
          } else {
            throw new Error("Erro ao buscar livros da API!");
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
      fetch("https://api-bibliotecaruy.herokuapp.com/v1/book/", {
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
      fetch(`https://api-bibliotecaruy.herokuapp.com/v1/book/${id}`, {
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

  static edit(book) {
    return new Promise((resolve, reject) => {
      fetch(`https://api-bibliotecaruy.herokuapp.com/v1/book/${book.id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ name: book.name })
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

  static listarAuthors() {
    // return new Promise((resolve, reject) => {
    //   let nextPage = "";
    //   let authores = [];
    //   while(nextPage !== null) {
    //     let [authores, next] = this.pages(
    //       "https://api-bibliotecaruy.herokuapp.com/v1/author/"
    //     )
    //     .then((authores, next) => {
    //       nextPage = next;
    //       authores.push(...authores);
    //     })
    //   }
    //   resolve(authores);
    // });
  }

  pages(url) {
    // return new Promise((resolve, reject) => {
    //   fetch(url)
    //     .then(resp => {
    //       if (resp.ok) {
    //         resp.json().then(data => {
    //           return data.results
    //         });
    //       } else {
    //         throw new Error("Erro ao buscar autores da API!");
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       reject(error);
    //     });
    // });
  }
}
