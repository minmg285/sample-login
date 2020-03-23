import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: '#430736',
      color: '#fff'
    },
    header: {
      textAlign: 'center',
      background: '#430736',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }

  }),
);

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  async function handleLogin () {
    const apiBaseUrl = "https://api.grandtwinbrothers.com";
    
    await axios.post(apiBaseUrl+'/token', {
      header:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      auth: {
        "username":username,
        "password":password
      },
      withCredentials: true
    })
      .then(function (response) {
        console.log(response);
        if(response.data.code === 200){
          console.log("Login successfull");
          setError(false);
          setHelperText('Login Successfully');
        }else if(response.data.code === 204){
          console.log("Username password do not match");
          setError(true);
          setHelperText('Username password do not match')
        }else{
          console.log("Username does not exists");
          setError(true);
          setHelperText('Username does not exist')
        }
    }).catch(function (error) {
        console.log(error);
        setError(true);
        setHelperText('Incorrect username or password')
    });
  }
  const handleKeyPress = (e:any) => {
    if (e.keyCode === 15 || e.which === 15) {
      isButtonDisabled || handleLogin();
    }
  };
  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="GWE Admin Panel" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="username"
                type="string"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={(e)=>setUsername(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={()=>handleLogin()}
              disabled={isButtonDisabled}>
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
}

export default Login;