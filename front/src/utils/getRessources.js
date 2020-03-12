
export default async function getRessources(table, section, option,server_full) {

    const options = {
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('tSoEkCeRnT')
        }),
    }
    if(option === null){
        let url = server_full + '/api/' + table +'?section='+ section + '&image_id=' + option;
        const data = await (await (fetch(url, options))).json();
        return data;
    }else if(option){
        let url = server_full + '/api/' + table +'/'+ section +'?section='+ section;
        const data = await (await (fetch(url, options))).json();
        return data;
    }
}