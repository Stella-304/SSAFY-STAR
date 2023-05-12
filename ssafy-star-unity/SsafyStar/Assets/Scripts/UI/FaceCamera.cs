using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using Fusion;

public class FaceCamera : MonoBehaviour
{
    Camera cam;
    [SerializeField]
    private TMP_Text textNickname;

    private void Start()
    {
        cam = Camera.main;
    }

    void Update()
    {
        Transform cameraTransform = cam.transform;

        transform.LookAt(transform.position + cameraTransform.rotation * Vector3.forward, cameraTransform.rotation * Vector3.up);
    }


    public void SetNickName()
    {
        SendMyNickName();
    }

    [Rpc(RpcSources.All, RpcTargets.All)]
    public void SendMyNickName(RpcInfo rpcInfo = default)
    {
        textNickname.text = PlayerPrefs.GetString("Nickname", "Guest");
    }
}
