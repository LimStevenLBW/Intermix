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
                  "https://00e9e64bac689f4134d0dc3bbea01b8745da42eb89461e5b0f-apidata.googleusercontent.com/download/storage/v1/b/beachhacksintermix/o/test2.png?qk=AD5uMEvvElrK05ICIps_XlvPoFcrrx_6p_Hes9lvfToqaQEpInRwQCQi0BBt1A7sEuz2XCD_JNnrpddm6LXMMff6McTJP3ZyVEt6vEzn4orkWsqI7kLY1aIbebgd2VwyqW4BFBXBtylk30qMHTx9w7VysyBUS4t0ZunmK6IAG0gseyJU1FhAYbxwnEBC043ksW9qrdr18frzRMym7Svr3yHIPlgI2GtbZ0CAriYNn_oh7XoHEzHB_dMFkgPEwu2vV0VBxNruA5IalMreIWEIihzaslBGHrl5ys3bZYL4_sk3foqg6ZX_lwduX5JrMLBfL7dEaAE2JQ6lshIhBbTwPPT-ufS2Z19Vysxol_S-1lzMdtRBWRQN7FC9NoVG-BuYvglij6pnzA82DVAMXuQ6geX4SMy2g9U7-UKcyGCnRm21Z6xa9hUrDTpupm4pWxw9V-_R7BznuWkoG74ufuEX_8Pm1yRdv33Da8wElJCo8lW6bpjjnbfaA_xnaXRzG3AUNqygo3edgLUG2mt2S1uMyVISkxtP5wc4GGakyg2Mg3whtilMfQbXounBQrkAo2xAMz7b5qfKKycGYO4PgP4sgHSPIB0D9xQtY_9JkFUQ1o8P8QuKb6HsC8okgjnF6Qvgrqi9L8_y4AZBMkL00oSVuswyTeXgOkCc01geCesu54B90pE0ZoaqR0-bPfvCrGTtC_LLhS-hZtqLgnzN2MJEUHcN_5ZS3p8UhN93j8hV674w8HrSyyOnVM3vEbFs6MeI3GFbg5ea8bChFdOoXvCrJbFsVbtTqdEaOQ"
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

  submitToGoogle = async (requestBody) => {
    try {
      this.setState({ uploading: true });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
        "AIzaSyA89OvAJLy3-YG33_ePHRODoFeQJeNPBW8",
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
  displayEmotion = (googleResponse) =>{
    
    if(googleResponse){
      //decompose full object
      let emotion = googleResponse
     // .getJSONArray("faceAnnotations");

      console.log("Responses");
      console.log(emotion[0].angerLikelihood);
      
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
    return(
      <p className = "emotion_guess">Test</p>
     );
    }
    else{
      return(<p></p>);
    }



  }
  
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
                   <div id ="emotion">{this.displayEmotion(this.state.googleResponse)}</div>
                 </div>
              </body>
        </React.Fragment>
      );
    }
    
}
 
export default Chat;