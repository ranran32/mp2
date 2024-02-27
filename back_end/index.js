const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


  // Login and Registration

const user= [];

app.post('/register', (req,res)=> {
  let username = req.body.username;
  let password = req.body.password;
  let email =req.body. email;


  const userExist= user.some(record=> record.username === username && record.password === password);

  if (userExist) {
    res.status(409).json({
      code:'error',
      msg: 'User already Exist'
    })
  } else {
    const userCount= user.length + 1;
    const newUser= {
      id: userCount,
      username: username,
            password: password,
            email: email,
    };

    user.push(newUser);

    res.status(200).json({
      code: 'success',
      msg: 'registraion successful',
      user: newUser
    })

  }
})


  app.post('/login',(req,res)=> {
    let username= req.body.username;
    let password= req.body.password;

    const logUser= user.find( (record)=> {
      return record.username === username && record.password === password;
    });

    if (logUser) {
      res.status(200).json ({
        code: 'success',
        msg: 'Login successful',
        user:logUser

      })
    } else {
      res.status(200).json( {
        code: 'error',
        msg: 'failed logging in'
      })
    }
  })









  // CRUD

  // DEPLOYED

const profileDB = [ {
  id: 1,
  name: 'Nustar',
  printer: [
    {
      brand: 'HP',
      model: 'M426',
      serial: 'CNB649245',
    },
  ],
  
},
{
  id: 2,
  name: 'Uc Med',
  printer: [
    {
      brand: 'Canon',
      model: 'LBP 2900',
      serial: 'LMPA167864',
    },
  ],
},
];

app.get('/all-client', (req,res)=> {
  res.json(profileDB)
})
app.get ('/all-client/:id',(req,res)=> {
  const id= parseInt(req.params.id);
  const clientFound= profileDB.find ((client)=> {
    return id === client.id
  })
  if (clientFound){
    res.status(200).json('client found');
} else {
    res.status(400).json("Invalid Id")
}
})
app.get('/all-client/:id/:printerIndex', (req, res) => {
  const id = parseInt(req.params.id);
  const printerIndex = parseInt(req.params.printerIndex);

  const client = profileDB.find((client) => {
    return id === client.id;
  });

  if (client) {
    if (printerIndex >= 0 && printerIndex < client.printer.length) {
      const printer = client.printer[printerIndex];
      res.status(200).json(printer);
    } else {
      res.status(400).json({ error: "Invalid printer index" });
    }
  } else {
    res.status(404).json({ error: "Client not found" });
  }
});

app.post('/add-client', (req, res) => {
  let name = req.body.name;
  let brand = req.body.brand;
  let model = req.body.model;
  let serial = req.body.serial;
  
  const newClient = {
    id: profileDB.length + 1,
    name: name,
    printer: [
      {
        brand: brand,
        model: model,
        serial: serial,
      }
    ]
  }
  
  profileDB.push(newClient);

  const addedClient = profileDB.find(client => client.id === newClient.id);

  if (addedClient) {
    res.status(200).json({ code: "success", msg: "added successfully" });
  } else {
    res.status(401).json({ code: "failed", msg: "error" });
  }
});


app.post('/add-printer/:id', (req,res)=> {
    const id= parseInt(req.params.id);
    let brand = req.body.brand;
    let model = req.body.model;
    let serial = req.body.serial;

    const clientIndex = profileDB.findIndex(client=> client.id === id);
    
    if (clientIndex !== -1) {
      const newPrinter= {
        brand: brand,
        model: model,
        serial: serial,
      };
      profileDB[clientIndex].printer.push(newPrinter);
      res.status(200).json({ code: "success", msg: "added successfully" });
    } else {
      res.status(401).json({ code: "failed", msg: "error" });
    }
})

app.put('/edit-printer/:id/:printerIndex', (req, res) => {
  const id = parseInt(req.params.id);
  const printerIndex = parseInt(req.params.printerIndex);
  let brand = req.body.brand;
  let model = req.body.model;
  let serial = req.body.serial;

  
  const client = profileDB.find(client => client.id === id);


  if (client) {
  
    if (printerIndex >= 0 && printerIndex < client.printer.length) {

      client.printer[printerIndex].brand = brand || client.printer[printerIndex].brand;
      client.printer[printerIndex].model = model || client.printer[printerIndex].model;
      client.printer[printerIndex].serial = serial || client.printer[printerIndex].serial;

 
      res.status(200).json({ code: "success", msg: "Printer updated successfully" });
    } else {
      
      res.status(400).json({ code: "failed", msg: "Invalid printer index" });
    }
  } else {
    
    res.status(404).json({ code: "failed", msg: "Client not found" });
  }
});

app.delete('/delete-printer/:id/:printerIndex', (req, res) => {
  let id = parseInt(req.params.id);
  let printerIndex = parseInt(req.params.printerIndex);

  const foundClient = profileDB.find(client => client.id === id);

  if (foundClient) {
    if (printerIndex >= 0 && printerIndex < foundClient.printer.length) {
      foundClient.printer.splice(printerIndex, 1);
      res.status(200).json({
        code: 'success',
        msg: 'deleted'
      });
    } else {
      res.status(400).json({
        code: 'error'
      });
    }
  } else {
    res.status(200).json({
      code: 'error',
      msg: 'invalid id'
    });
  }
});


//DEPLOYED TO PULL_OUT

app.post('/pushPull-out/:id/:index',(req,res)=> {
  let id= parseInt(req.params.id);
  let index= parseInt(req.params.index);
  let remarks= req.body.remarks;
  let printerID= allPullOut.length + 1;

  let selectedClient = profileDB.find (printer => printer.id === id);

  if (selectedClient) {
    if (index >= 0 && index < selectedClient.printer.length) {
     
      allPullOut.push ({ ...selectedClient.printer[index], remarks: remarks, id:printerID });
      selectedClient.printer.splice(index, 1);
      res.status(200).json({
        code:'success',
        msg: 'pushed successfully',
        
      })
    }else {
      res.status(404).json ({
        code:'error',
        msg: 'printer not found'
      })
    }
  } else {
    res.status(404).json({ 
      code: 'error',
      msg:' client not found'
     });
  }
})


//PULL- OUTS

const allPullOut= [ {
  id:1,
  brand: 'Samsung',
  model: 'M3870',
  serial: 'ZDDFGHQDNAW9097',
  remarks: 'End of Contract'
},
{
  id:2,
  brand: 'HP',
  model: 'M426',
  serial: 'CDNKHABI123',
  remarks: 'Defective Scanner'
}
];

app.get('/all-pullOut', (req,res)=> {
  try {
    res.json(allPullOut);

  }catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.get('/all-pullOut/:id', (req,res)=> {
  let id= parseInt(req.params.id);
  const foundPrinter= allPullOut.find(printer=> printer.id === id);
  if (foundPrinter) {
    res.json(foundPrinter)
  }else {
   res.status(401).json({
    code:'failed'
   })
  }

})
//PULL_OUT TO REBUILD

app.post('/pushRebuild/:id',(req,res)=> {
  let id= parseInt(req.params.id);
  let rebuildId= allRebuild.length + 1;

  let selectedPrinter= allPullOut.find(printer=> printer.id === id);

  if (selectedPrinter) {
    allRebuild.push({ ...selectedPrinter, id:rebuildId});
    rebuildList.push({...selectedPrinter,id:rebuildId});


  let removePrinter= allPullOut.findIndex(printer=> printer.id === id );
  if (removePrinter !== -1) {
    allPullOut.splice(removePrinter,1);
  }
    res.status(200).json({
      code:'success'
    })
  }else {
    res.status(400).json({
      code:'failed'
    })
  }
})

//REBUILD LIST
const rebuildList= [];

app.get('/rebuild-list',(req,res)=> {
  res.json(rebuildList);
})

// RBUILDS

const allRebuild= [ {
  id:1,
  brand: 'Samsung',
  model: 'M3870',
  serial: 'ZDDFGHQDNAW9097'

},
{
  id:2,
  brand: 'Canon',
  model: 'LBP 2900',
  serial: 'MGQA786532'

}
];


app.get('/all-rebuild', (req,res)=> {
  try{
    res.json(allRebuild)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/all-rebuild/:id',(req,res)=> {
  let id= parseInt(req.params.id);

  let foundPrinter= allRebuild.find(printer=> printer.id === id);

  if (foundPrinter) {
    res.json(foundPrinter);
  }else {
    res.status(400).json({
      code:'error'
    })
  }
})

app.post('/pushDeployed/:id',(req,res)=> {
  let id= parseInt(req.params.id);
  let name= req.body.name;
  let brand= req.body.brand;
  let model= req.body.model;
  let serial= req.body.serial;

  let foundPrinter= allRebuild.find(printer=> printer.id === id);

  if (foundPrinter) {

    let existingClient= profileDB.find(client=> client.name === name);

    if (existingClient) {
      const newPrinter= {
        brand:brand,
        model: model,
        serial: serial
      }
      existingClient.printer.push(newPrinter);
      res.status(200).json({
        code:'success',
        msg:'adding in existing client',
        client: existingClient
      })
    } else {
      const newClient= {
        id:profileDB.length + 1,
        name: name,
        printer: [
          {brand: brand,
          model:model,
          serial:serial}
        ]
      }
      profileDB.push(newClient);
      res.status(200).json({
        code:'success',
        msg: 'adding in new client',
        client:newClient
      })
    }
    let removePrinter= allRebuild.findIndex(printer=> printer.id===id);

    if (removePrinter !== -1) {
      allRebuild.splice(removePrinter,1);
    }

  } else {
    res.status(400).json({
      code: 'error',
      msg: 'id not found'
    })
  }
})




app.listen(5000);
console.log('Server is running on port 5000');
