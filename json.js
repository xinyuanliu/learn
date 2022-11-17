const json = {
    a: {
      b: {
        c: 1,
        d: {
          f: 2,
          g: [1, 2, 3],
          h: [
            {
              id: 1,
              name: 'x',
            },
            {
              id: 2,
              name: 'y',
            }
          ]
        }
      }
    }
  }
  
  const convert1 = [
    {
      okey: 'a',
      nkey: 'na',
    },
    {
      okey: 'a.b',
      nkey: 'nb'
    }
  ]
  
  
  
  const result1 = {
    na: {
      nb: {
        // 原来的
      }
    }
  }
  
  
  const convert2 = [
    {
      okey: 'a.b.c',
      nkey: 'nc',
    },
    {
      okey: 'a.b.c.d.g',
      nkey: 'ng',
    },
    {
      okey: 'a.b.c.d.h.id',
      nkey: 'nid',
    }
  ]
  
  const result2 = {
    a: {
      b: {
        nc: 1,
        d: {
          f: 2,
          ng: [1, 2, 3],
          h: [
            {
              nid: 1,
              name: 'x',
            },
            {
              nid: 2,
              name: 'y',
            }
          ]
        }
      }
    }
  }