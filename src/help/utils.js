export function getRedirectPath({role}){
  const url = role === 0 ? '/stuinfo' : '/teacherinfo'
  return url;
}