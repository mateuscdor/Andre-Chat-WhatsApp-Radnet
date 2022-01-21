class RenderNotificacaoChat {
  static renderNotificacaoChat(notificacao) {
    let notify = `   
    <div class="notification-contact">
        <p class="bg-danger pt-1 pb-1 ps-2 pe-2"
        style="position: absolute; margin-left: -34px; margin-top: -2px; border-radius: 3px; color: white;font-size: 8pt;">
        <strong class="qtd-notification">${notificacao}</strong>
        </p>
    </div>`;

    return notify;
  }
}
