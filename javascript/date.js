export  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam de 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
}