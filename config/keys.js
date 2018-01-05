let exportThis = { error: 'no keys defined' };

if(process.env.NODE_ENV==='development'){
    exportThis = require('./dev');
}else if(process.env.NODE_ENV==='production'){
    exportThis = require('./prod');
}else{
    exportThis = require('./dev');
    // console.error('Unexpected NODE_ENV value in keys. NODE_ENV='+process.env.NODE_ENV);
}
module.exports = exportThis;