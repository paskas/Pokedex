function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function showLoadingSpinner() {
    let show = document.getElementById('loading_spinner').classList;
    show.remove('d-none');
}


function hideLoadingSpinner() {
    let show = document.getElementById('loading_spinner').classList;
    show.add('d-none');
}