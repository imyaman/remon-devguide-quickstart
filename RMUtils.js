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
  return getCamStatus(myremon);
}

function toggleMicEnabled (myremon) {
  if (isMicEnabled(myremon)) {
    myremon.muteLocalAudio(true); // mic를 끔, true/false 주의
  } else {
    myremon.muteLocalAudio(false); // mic를 켬, true/false 주의
  }
  return getMicStatus(myremon);
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
    .then(() => console.info('changeCamWidthHeight success'))
      .catch( console.error('changeCamWidthHeight failure') );

  return getCamWidthHeightFPS(myremon);
}

function changeCamFPS (myremon, f) {
  let currentSettings = getCamWidthHeightFPS(myremon);
  let w = currentSettings.w;
  let h = currentSettings.h;
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: w, height: h, frameRate: { ideal: f } })
    .then(() => console.info('changeCamFPS success'))
      .catch( console.error('changeCamFPS failure') );

  return getCamWidthHeightFPS(myremon);
}

function changeCamWidthHeightFPS (myremon, w, h, f) {
  let currentSettings = getCamWidthHeightFPS(myremon);
  myremon.config.rtc.localStream.getVideoTracks()[0]
    .applyConstraints({ width: w, height: h, frameRate: { ideal: f } })
    .then(() => console.info('changeCamWidthHeightFPS success'))
      .catch( console.error('changeCamWidthHeightFPS failure') );

  return getCamWidthHeightFPS(myremon);
}

function cleanupRemon (myremon) {
  document.querySelector(myremon.config.view.local).srcObject=undefined;
  myremon.config.rtc.localStream.getTracks().forEach(function (track) {
    track.stop();
  });
  myremon=undefined;
}
