//返回用户权限列表
export function getCurrentAuthority(){
    return ["admin"];
}

//检验用户权限是否与指定权限相符
export function check(authority){
    const current=getCurrentAuthority();
    //用户权限列表中是否存在一项属于所给authority
    return current.some(item=>authority.includes(item));
}

export function isLogin(){
    const current =getCurrentAuthority();
    return current&&current[0]!="guest";
}