using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;


public class PlayerColor : NetworkBehaviour
{
    public MeshRenderer MeshRenderer;

    [Networked(OnChanged = nameof(NetworkColorChanged))]
    public Color NetworkedColor { get; set; }

    private bool _cPressed = false;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.E))
        {
            Debug.Log("e");
            _cPressed = true;
        }
    }

    void FixedUpdate()
    {

        //Debug.Log("---");
        //if (HasStateAuthority == false)
        //{
        //    Debug.Log("false");
        //    return;
        //}

        if (_cPressed)
        {
            Debug.Log("change color");
            NetworkedColor = new Color(Random.Range(0f, 1f), Random.Range(0f, 1f), Random.Range(0f, 1f), 1f);
            _cPressed = !_cPressed;
        }
    }

    private static void NetworkColorChanged(Changed<PlayerColor> changed)
    {
        changed.Behaviour.MeshRenderer.material.color = changed.Behaviour.NetworkedColor;
    }
}
