const form = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#connect"),
  };
  const button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = fetch ("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.error) {
          alert("Error Password or Username"); /*displays error message*/
        } else {
          window.open(
            "index.html"
          ); /*opens the target page while Id & password matches*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });