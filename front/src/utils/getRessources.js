
export default async function getRessources(table, section, image_id, server_full) {

    const options = {
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('tSoEkCeRnT')
        }),
    }
    if(image_id === null){
        let url = server_full + '/api/' + table +'?section='+ section + '&image_id=' + image_id;
        const data = await (await (fetch(url, options))).json();
        return data;
    }
}