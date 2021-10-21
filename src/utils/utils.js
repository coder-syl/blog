let Utils=function(){}
Utils.prototype.formatDateTOYYYYMMDD=function(date){
    const curDate=new Date(date);
    let year=curDate.getFullYear()
    let month=curDate.getMonth()
    let day=curDate.getDay();
    return `${year}-${month+1}-${day}`
}

export default new Utils();