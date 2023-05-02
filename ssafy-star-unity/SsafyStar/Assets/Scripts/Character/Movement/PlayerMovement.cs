using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using UnityEngine.InputSystem;
using Cinemachine;

public class PlayerMovement : NetworkBehaviour
{
    [Header("Move")]
    public bool stop = false;
    [Networked]
    public float playerSpeed { get; set; }
    public Vector3 velocity = Vector3.zero;
    [SerializeField]
    private float playerwalkSpeed = 2f;
    [SerializeField]
    private float playerRunSpeed = 6f;
    [SerializeField]
    private bool run = false;
    private float chatDistance = 3f;

    [Header("Camera")]
    public Camera Camera;
    private CameraControl cameraControl;

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
        if (stop)
        {
            anim.SetBool("Walk", false);
            return;
        }

        if (Input.GetButtonDown("Jump"))
        {
            if (!controller.IsGrounded) return;
            _jumpPressed = true;
            anim.SetBool("Jump", true);
        }

        if (Input.GetKey(KeyCode.LeftShift))
        {
            Debug.Log("pressed");
            run = true;
        }
        else
        {
            run = false;
        }

        //if (run)
        //{
        //    playerSpeed = playerRunSpeed;
        //}
        //else
        //{
        //    playerSpeed = playerwalkSpeed;
        //}

        if (Input.GetMouseButtonDown(0))
        {
            RaycastHit hit;
            Ray ray = Camera.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast(ray, out hit))
            {
                if (hit.collider.gameObject.name == "NPC")
                {
                    if (Vector3.Distance(transform.position, hit.collider.transform.position) > chatDistance) return;

                    hit.collider.gameObject.GetComponent<NPC>().player = gameObject;
                    hit.collider.gameObject.GetComponent<NPC>().doChat = true;

                    cameraControl.NPCPriority(transform);

                    stop = true;
                }
            }
        }
    }

    public override void Spawned()
    {
        if (HasStateAuthority)
        {
            playerSpeed = playerwalkSpeed;

            Camera = Camera.main;
            cameraControl = GetComponent<CameraControl>();
            cameraControl.InitiateCamera(transform.Find("InterpolationTarget"));

            GameObject.Find("UIMenu").GetComponent<MapController>().player = this.gameObject;
            GameObject.Find("UIMenu").GetComponent<ChatController>().player = this.gameObject.GetComponent<PlayerMovement>();
        }
    }

    public override void FixedUpdateNetwork()
    {
        if (HasStateAuthority == false)
        {
            return;
        }

        if (stop) return;

        //InputSystem.Update();

        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        if (horizontal != 0 || vertical != 0)
        {
            anim.SetBool("Walk", true);
        }
        else
        {
            anim.SetBool("Walk", false);
        }

        if (run)
        {
            anim.SetBool("Run", true);
            playerSpeed = playerRunSpeed;
        }
        else
        {
            anim.SetBool("Run", false);
            playerSpeed = playerwalkSpeed;
        }

        Vector3 move = new Vector3(horizontal, 0, vertical) * Runner.DeltaTime * playerSpeed;

        if (_jumpPressed)
        {
            controller.Jump();
            _jumpPressed = false;
        }

        controller.maxSpeed = playerSpeed;
        controller.Move(move + velocity * Runner.DeltaTime);
    }
}
