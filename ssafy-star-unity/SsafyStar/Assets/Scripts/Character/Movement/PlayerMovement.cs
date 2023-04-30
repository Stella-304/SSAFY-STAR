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

    [Header("Anim")]
    public Animator anim;

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
            return;
        }

        //if (controller.IsGrounded)
        //{
        //}

        //InputSystem.Update();

        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        if(horizontal !=0 || vertical !=0)
        {
            anim.SetBool("Walk", true);
        }
        else
        {
            anim.SetBool("Walk", false);
        }

        Vector3 move = new Vector3(horizontal, 0, vertical) * Runner.DeltaTime * playerSpeed;

        if (_jumpPressed)
        {
            controller.Jump();
            _jumpPressed = false;
        }

        controller.Move(move + velocity * Runner.DeltaTime);
    }
}
