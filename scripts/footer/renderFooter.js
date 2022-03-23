// Function that takes element location as input and injects footer html at that location
export const renderFooter = () => {
    function getData(url) {
        const response = fetch(url)
        .then(data => data.text())
        .then(text => {
            placeHTML(text);
        })
    }

    const placeHTML = (data) => {
        // Automatically findes the first footer element and places html there
        document.querySelector('footer').innerHTML = data;
    }
    
    return getData('/scripts/footer/footer.html');
}