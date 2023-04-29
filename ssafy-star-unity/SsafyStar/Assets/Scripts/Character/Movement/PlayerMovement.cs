using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using UnityEngine.InputSystem;

public class PlayerMovement : NetworkBehaviour
{
    [Header("Move")]
    public float playerSpeed = 2f;
    public Vector3 velocity = Vector3.zero;
    public Camera Camera;

    [Header("Jump")]
    public float JumpForce = 5f;
    public float GravityValue = -3f;

    private bool _jumpPressed = false;

    private NetworkCharacterControllerPrototype controller;

    private void Awake()
    {
        controller = GetComponent<NetworkCharacterControllerPrototype>();
    }

    void Update()
    {
        if (Input.GetButtonDown("Jump"))
        {
            Debug.Log("jump");
            _jumpPressed = true;
        }
    }

    public override void Spawned()
    {
        if (HasStateAuthority)
        {
            Camera = Camera.main;
            Camera.GetComponent<CameraMovement>().Target = GetComponent<NetworkTransform>().InterpolationTarget;
        }
    }

    public override void FixedUpdateNetwork()
    {
        if (HasStateAuthority == false)
        {
            Debug.Log("false");
            return;
        }

        if (controller.IsGrounded)
        {
            Debug.Log("grounded");
            //velocity = new Vector3(0, -1, 0);
        }

        InputSystem.Update();

        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        //var cameraRotationY = Quaternion.Euler(0, Camera.transform.rotation.eulerAngles.y, 0);
        //Vector3 move = cameraRotationY * new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical")) * Runner.DeltaTime * playerSpeed;
        Vector3 move = new Vector3(horizontal, 0, vertical) * Runner.DeltaTime * playerSpeed;

        if(_jumpPressed)
        {
            controller.Jump();
            _jumpPressed=false;
        }

        controller.Move(move + velocity * Runner.DeltaTime);

        if (move != Vector3.zero)
        {
            gameObject.transform.forward = move;
        }

        //_jumpPressed = false;
    }
}
