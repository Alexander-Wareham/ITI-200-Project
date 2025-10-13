document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('submitComment');
  const input = document.getElementById('commentInput');
  const list = document.getElementById('commentList');

  if (btn && input && list) {
    btn.addEventListener('click', () => {
      if (input.value.trim() !== "") {
        const newComment = document.createElement('div');
        newComment.classList.add('alert', 'alert-secondary', 'mt-2');
        newComment.textContent = input.value;
        list.appendChild(newComment);

        input.value = "";

        alert("Thank you for your comment! Feel free to interact with other discussions!");
      }
    });
  }
});