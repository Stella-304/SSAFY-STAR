using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class FaceCamera : MonoBehaviour
{
    Camera cam;
    [SerializeField]
    private TMP_Text textNickname;

    private void Start()
    {
        cam = Camera.main;
        if (gameObject.transform.root.tag != "NPC")
        {
            textNickname.text = PlayerPrefs.GetString("Nickname", "Guest");
        }
    }

    void Update()
    {
        Transform cameraTransform = cam.transform;

        transform.LookAt(transform.position + cameraTransform.rotation * Vector3.forward, cameraTransform.rotation * Vector3.up);
    }
}
