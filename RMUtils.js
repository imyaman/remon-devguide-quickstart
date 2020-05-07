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



function getCamWidthHeightFPS (myremon) {
  let mysettings = remon.config.rtc.localStream.getVideoTracks()[0].getSettings();
  let w = mysettings.width;
  let h = mysettings.height;
  let f = mysettings.frameRate;

  return { width: w, height: h, fps: f };
}

function changeCamWidthHeight (myremon, w, h) {
  let currentSettings = getCamWidthHeightFPS(myremon);
  let currentFPS = currentSettings.f;
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: w, height: h, frameRate: { ideal: currentFPS } })
    .then(()=> return getCamWidthHeightFPS(myremon) )
      .catch( console.error('changeCamWidthHeight failure') );
}

function changeCamFPS (myremon, f) {
  let currentSettings = getCamWidthHeightFPS(myremon);
  let w = currentSettings.w;
  let h = currentSettings.h;
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: w, height: h, frameRate: { ideal: f } })
    .then(()=> return getCamWidthHeightFPS(myremon) )
      .catch( console.error('changeCamFPS failure') );
}

function changeCamWidthHeightFPS (myremon, w, h, f) {
  let currentSettings = getCamWidthHeightFPS(myremon);
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: w, height: h, frameRate: { ideal: f } })
    .then(()=> return getCamWidthHeightFPS(myremon) )
      .catch( console.error('changeCamWidthHeightFPS failure') );
}

function cleanupRemon (myremon) {
  document.querySelector(myremon.config.view.local).srcObject=undefined;
  if(remon.config.rtc.localStream){
    myremon.config.rtc.localStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
}
