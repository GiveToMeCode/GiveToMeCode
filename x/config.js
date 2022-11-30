const options = [
  {
    value: "GET",
    label: "GET",
    style:{
      color:"#4ab793",
    }
  },
  {
    value: "POST",
    label: "POST",
    style:{
      color:"#ce7933"
    }
  },
  {
    value: "PUT",
    label: "PUT",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "DELETE",
    label: "DELETE",
    style:{
      color:"#d94c1d"
    }
  },
  {
    value: "OPTIONS",
    label: "OPTIONS",
    style:{
      color:"187fde"
    }
  },
  {
    value: "HEAD",
    label: "HEAD",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "PATCH",
    label: "PATCH",
    style:{
      color:"#cc2c84"
    }
  },
  {
    value: "TRACE",
    label: "TRACE",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "CONNECT",
    label: "CONNECT",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "COPY",
    label: "COPY",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "UNLINK",
    label: "UNLINK",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "LINK",
    label: "LINK",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "PURGE",
    label: "PURGE",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "LOCK",
    label: "LOCK",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "UNLOCK",
    label: "UNLOCK",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "MKCOL",
    label: "MKCOL",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "MOVE",
    label: "MOVE",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "REOPIND",
    label: "REOPIND",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "REPORT",
    label: "REPORT",
    style:{
      color:"#187fde"
    }
  },
  {
    value: "VIEW",
    label: "VIEW",
    style:{
      color:"#187fde"
    }
  },
];
const key = "floders";
const value = [
  {
      floderName:"登录",
      intface:[
          {
            name: "register",
            path: "/test",
            method: "get",
            query: {
                xxx: 'xxx'
            },
            body: {
                username: 'zhu',
                password: "xxsa1213"
            },
            header: {

            }
          }
      ]
  }
]

const config = {
  options:options,
  storageKey:key,
  storageValue:value,
}

export default config;

