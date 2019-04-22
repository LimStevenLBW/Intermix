import React, { Component } from 'react';
import Messages from "./Messages.jsx";
import Input from "./Input.jsx"
import './Chat.css'

/**
 * 
 */
class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            user: {
              username: this.props.input,
              color: this.randomColor(),
            },
            googleResponse: "",
            uploading: false,
            requestBody: "",
        }
    }

    componentDidMount() {
      const userVid = document.getElementById('userVid');
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const constraints = {
        // this will allow to ask user for permission of video access
        video: true,
      };

      // setup width & height of canvas to 
      canvas.width = userVid.innerWidth;
      canvas.height = userVid.innerHeight;
      let requestBody;
      // TODO: implement taking snapshot for an interval amount of time, i.e. 5000ms
        // drawImage is a canvas' function that will draw the image from specified source
        // Draw the video frame to the canvas and sent to .png file
        context.drawImage(userVid, 0,0, canvas.width, canvas.height);
        var currentImage = canvas.toDataURL('image/png');
      //  currentImage = currentImage.replace(/^data:image\/(png|jpg);base64,/, "");
      
      /*
        let requestBodyStringified;
        requestBodyStringified = JSON.stringify({
          requests: [
            {
              features: [
                { type: 'FACE_DETECTION', maxResults: 10 },
              ],
              "image":{
              "source":{
                "imageUri":
                  "https://00e9e64bac7c34a2c4985f57b6a5dfaf40a809bef143890d68-apidata.googleusercontent.com/download/storage/v1/b/beachhacksintermix/o/test1.jpg?qk=AD5uMEu4Hwfk0NcwDFfxnxk4F2h2AfwPryctmo7iwvk-Vh9tPW5KCcZteDJ7Re2mhWabra2AoBpjyt8svlmYnF3PCX3QmduqCh4AxkBUllrZ9kBnmPgfb4a7KJwKkRopjrkF_nIUN8Z-w0Amh1WWcK4HtIK7GmGQi9tqobYxODeAUFOLqJBPNb6SToWKfbGZ5dh3PhM_HeROijgumhRqPRY7uBbIMRRsIKS2NBI-WY3IGX2_Cc_oGy_-PBm91KrLL6lDNIgaDdGMyukD1YC5KulnATlGG3nq7QgtR9zzFbm-tKUFB8cZKnNb1J9D2Elh4CUq_uYu34UpChcpFD9DfN1MQMmt9ElX3hxNF2CXbZJC4N-npl9yRadVzfE510kCA2btLy5BUsC8bkV_B_WE6sDn3nr6Y9YzjmKYcRHuIGoCa_iiCjWHR26ICajY_cmq5GyHFxWSfBRc-SX5Vb_YWmEtyIaLxyNhEoURKthIIc0w2-bRneNmJHBMZEo1yfAzfN1U6DwTrZNLWLX1oy935MyuEBDca0-Cf0I7XgrUncJ9iFpBlTLzm6nn9NQra-ECO-tyukgsfZyRwk2mdkD62jRt_HxnJ2oKBzdGRJi_yHR696qrZ1hWevPhScYi2I0CSEeRoxzsqTzdbqTtfg49WrwsWbP0cV4aNnOHbDuoWMC_uQEf9MMjtVl4ppoTFFnc3A30RF0TujnnxX7q7tNEzwSrWdMwJaGHdx6rd-t5yJd8t-CRWQBeJsqveUA3DV1ujCuu3bkT3VlpGZFqaTVQJxKd7RFbEsBvXQ"
              }
            }
            }
          ]
          });

      this.setState({requestBody: requestBodyStringified});
      // Attach the video stream to the video element and autoplay.
      navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
          userVid.srcObject = stream;
      });
*/
      //SETUP SCALE DRONE CONNECTION
      this.drone = new window.Scaledrone("Jh23ZEsBY5q1UjuJ", {
          data: this.state.user
      });
  
      //Scale drone open event, creates the room
      this.drone.on('open', error => {
          if (error) {
          return console.error(error);
          }
          const user = {...this.state.user};
          user.id = this.drone.clientId;
          this.setState({user});
      });

      //Assign observable room, the observable prefix is required
      const room = this.drone.subscribe("observable-hack");
  
      //Suscribe to data event of room to know when messages arrive
      room.on('data', (data, user) => {
          const messages = this.state.messages;
          messages.push({user, text: data});
          this.setState({messages});
      });
/*
       // A user joined the room!
       room.on('member_join', user => {
          const messages = this.state.messages;
          const message = ("" + user.clientData.username + " has arrived~");
          user.id = "arrived";
          messages.push({user, text: message});
          this.drone.publish({
            room: "observable-hack",
            message
          });
      });
      */
      
  };
/*
  submitToGoogle = async (requestBody) => {
    try {
      this.setState({ uploading: true });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
        apikey",
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: requestBody
        }
      );
      let responseJson = await response.json();
      console.log("MY RESPONSE SHOULD BE HERE");
      console.log(responseJson);
      
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
/*
        "detectionConfidence": 0.980691,
          "joyLikelihood": "VERY_LIKELY",
          "sorrowLikelihood": "VERY_UNLIKELY",
          "angerLikelihood": "VERY_UNLIKELY",
          "surpriseLikelihood": "VERY_UNLIKELY",

*/
  //displayEmotion = (googleResponse) =>{
    
      //decompose full object
  
    
      //console.log(googleResponse[0]); undefined
      
        
    
      
     // var joy = googleResponse["joyLikelihood"];
     /* var sorrow = googleResponse.faceAnnotations["sorrowLikelihood"];
      var anger = googleResponse.faceAnnotations["angerLikelihood"];
    var surprise = googleResponse.faceAnnotations["surpriseLikelihood"];
      var confidence =  googleResponse.faceAnnotations["detectionConfidence"];
  
      
      console.log(sorrow);
      console.log(anger);
      console.log(surprise);
      console.log(confidence);  
      console.log(joy);
      */
     /*
     if(googleResponse){
      return(
        <p id = "emotion_guess">{JSON.stringify({googleResponse})}</p>
       );
     }*/
   

 // }
  
/**
 * Generates a random color as a placeholder for an avatar
 */
    randomColor(){
      return '#' + Math.floor(
        Math.random() * 0xFFFFFF
        ).toString(16);
    };
  
    //Publish a new message to scaledrone
    onSendMessage = (message) => {
      this.drone.publish({
        room: "observable-hack",
        message
      });

      this.submitToGoogle(this.state.requestBody)
    }

    render() {
      
      return (
        <React.Fragment>
              <body>
                <div id ="chat">
                  <Messages
                      messages={this.state.messages}
                      currentUser={this.state.user}
                    />
                  <Input
                  
                    onSendMessage={this.onSendMessage}
                  />

                  <div id ="picture">    
                     <video id="userVid" controls autoplay></video>
                       <canvas id = "canvas"></canvas>
                  </div>
                   <div id ="emotion"></div>
                 </div>
              </body>
        </React.Fragment>
      );
    }//{this.displayEmotion(this.state.googleResponse)}
    
}
 
export default Chat;