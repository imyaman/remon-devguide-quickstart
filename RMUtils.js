function isMicEnabled (myremon) {
  return myremon.config.rtc.localStream.getAudioTracks()[0].enabled;
}

function isCamEnabled (myremon) {
  return myremon.config.rtc.localStream.getVideoTracks()[0].enabled;
}

function toggleCamEnabled (myremon) {
  if (isCamEnabled(myremon)) {
    myremon.pauseLocalVideo(false); // camera를 끔, true/false 주의
  } else {
    myremon.pauseLocalVideo(true); // camera를 켬, true/false 주의
  }
  return isCamEnabled(myremon);
}

function toggleMicEnabled (myremon) {
  if (isMicEnabled(myremon)) {
    myremon.muteLocalAudio(true); // mic를 끔, true/false 주의
  } else {
    myremon.muteLocalAudio(false); // mic를 켬, true/false 주의
  }
  return isMicEnabled(myremon);
}

function getCurrentCamDeviceId (myremon) {
  if(! myremon.config.rtc.localStream){
    return false;
  }

  return myremon.config.rtc.localStream.getVideoTracks()[0].getCapabilities().deviceId;
}

function getCamWidthHeightFPS (myremon) {
  if(! myremon.config.rtc.localStream){
    return false;
  }

  let mysettings = remon.config.rtc.localStream.getVideoTracks()[0].getSettings();
  let w = mysettings.width;
  let h = mysettings.height;
  let f = mysettings.frameRate;

  return { width: w, height: h, fps: f };
}

function changeCamWidthHeight (myremon, w, h) {
  if(! myremon.config.rtc.localStream){
    return false;
  }
  let deviceId = getCurrentCamDeviceId(myremon);
  let currentSettings = getCamWidthHeightFPS(myremon);
  let f = currentSettings.f;
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: { ideal: w }, height: { ideal: h }, frameRate: { ideal: f } })
    .then(()=> {console.info(getCamWidthHeightFPS(myremon));} )
      .catch( console.error('changeCamWidthHeight failure') );
}

function changeCamFPS (myremon, f) {
  if(! myremon.config.rtc.localStream){
    return false;
  }
  let currentSettings = getCamWidthHeightFPS(myremon);
  let w = currentSettings.w;
  let h = currentSettings.h;
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: { ideal: w }, height: { ideal: h }, frameRate: { ideal: f } })
    .then(()=> {console.info(getCamWidthHeightFPS(myremon));} )
      .catch( console.error('changeCamFPS failure') );
}

function changeCamWidthHeightFPS (myremon, w, h, f) {
  if(! myremon.config.rtc.localStream){
    return false;
  }
  let currentSettings = getCamWidthHeightFPS(myremon);
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: { ideal: w }, height: { ideal: h }, frameRate: { ideal: f } })
    .then(()=> {console.info(getCamWidthHeightFPS(myremon));} )
      .catch( console.error('changeCamWidthHeightFPS failure') );
}

function cleanupRemon (myremon) {
  if(myremon.config.view.local) {
    document.querySelector(myremon.config.view.local).srcObject=undefined;
  }
  if(remon.config.rtc.localStream){
    myremon.config.rtc.localStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
}
