document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return;

  function mostrarToast(mensagem, tipo = "success") {
    const antigo = document.querySelector(".feedback-toast");

    if (antigo) {
      antigo.remove();
    }

    const toast = document.createElement("div");

    toast.className = `feedback-toast ${tipo}`;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = mensagem;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3500);
  }

  function mostrarModal(titulo, mensagem) {
    const antigo = document.querySelector(".feedback-modal-backdrop");

    if (antigo) {
      antigo.remove();
    }

    const fundo = document.createElement("div");

    fundo.className = "feedback-modal-backdrop";
    fundo.setAttribute("role", "dialog");
    fundo.setAttribute("aria-modal", "true");

    const modal = document.createElement("div");

    modal.className = "feedback-modal";

    const tituloModal = document.createElement("h2");
    tituloModal.textContent = titulo;

    const textoModal = document.createElement("p");
    textoModal.textContent = mensagem;

    const botaoFechar = document.createElement("button");
    botaoFechar.type = "button";
    botaoFechar.textContent = "Fechar";

    modal.appendChild(tituloModal);
    modal.appendChild(textoModal);
    modal.appendChild(botaoFechar);

    fundo.appendChild(modal);
    document.body.appendChild(fundo);

    function fecharModal() {
      fundo.remove();
    }

    botaoFechar.addEventListener("click", fecharModal);

    fundo.addEventListener("click", (evento) => {
      if (evento.target === fundo) {
        fecharModal();
      }
    });
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();

      mostrarToast(
        "Revise os campos destacados.",
        "error"
      );

      return;
    }

    mostrarToast(
      "Cadastro validado com sucesso!",
      "success"
    );

    mostrarModal(
      "Cadastro pronto!",
      "Os dados foram preenchidos corretamente."
    );
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      mostrarToast(
        "Formulário limpo.",
        "success"
      );
    }, 0);
  });
});
