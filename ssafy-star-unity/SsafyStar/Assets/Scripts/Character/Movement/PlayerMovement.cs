using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using UnityEngine.InputSystem;
using Cinemachine;
using UnityEngine.SceneManagement;

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

    public bool doRespawn = false;
    public Transform respawnPos;
    public Transform interpolationPos;

    [Header("Camera")]
    public Camera Camera;
    private CameraControl cameraControl;

    [Header("Jump")]
    public float JumpForce = 5f;
    public float GravityValue = -3f;

    [Header("Anim")]
    public Animator anim;
    [SerializeField]
    private NetworkMecanimAnimator networkAnimator;

    private bool _jumpPressed = false;

    private NetworkCharacterControllerPrototype controller;

    private void Awake()
    {
        controller = GetComponent<NetworkCharacterControllerPrototype>();
    }

    public override void Spawned()
    {
        Camera = Camera.main;

        if (HasStateAuthority)
        {
            Debug.Log("spawned");

            playerSpeed = playerwalkSpeed;

            cameraControl = GetComponent<CameraControl>();
            cameraControl.InitiateCamera(transform.Find("InterpolationTarget"));
            GameObject.Find("MinimapCamera").GetComponent<CopyPosition>().target = transform;

            GameObject.Find("UIMenu").GetComponent<UIManager>().SetVisibleTrue();
            GameObject.Find("ChatRPC").GetComponent<ChatController>().player = this.gameObject.GetComponent<PlayerMovement>();

            respawnPos = GameObject.Find("SpawnPos").transform;
        }
    }

    void Update()
    {
        if (stop)
        {
            return;
        }

        if (Input.GetButtonDown("Jump"))
        {
            if (!controller.IsGrounded) return;
            _jumpPressed = true;
        }

        if (Input.GetKey(KeyCode.LeftShift))
        {
            run = true;
        }
        else
        {
            run = false;
        }

        if(Input.GetKeyDown(KeyCode.R))
        {
            Debug.Log("r ´©¸§");
            doRespawn = true;
        }

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

    public override void FixedUpdateNetwork()
    {
        if (HasStateAuthority == false)
        {
            return;
        }

        if (stop)
        {
            ResetAnimation();
            return;
        }

        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        if (horizontal != 0 || vertical != 0)
        {
            networkAnimator.Animator.SetBool("Walk", true);
        }
        else
        {
            networkAnimator.Animator.SetBool("Walk", false);
        }

        if (run)
        {
            networkAnimator.Animator.SetBool("Run", true);
            playerSpeed = playerRunSpeed;
        }
        else
        {
            networkAnimator.Animator.SetBool("Run", false);
            playerSpeed = playerwalkSpeed;
        }

        Vector3 move = new Vector3(horizontal, 0, vertical) * Runner.DeltaTime * playerSpeed;

        if (_jumpPressed)
        {
            controller.Jump();
            networkAnimator.Animator.SetBool("Jump", true);
            _jumpPressed = false;
        }

        controller.maxSpeed = playerSpeed;
        controller.Move(move + velocity * Runner.DeltaTime);

        if (doRespawn)
        {
            transform.position = respawnPos.position;
            doRespawn = false;
        }
    }

    private void ResetAnimation()
    {
        networkAnimator.Animator.SetBool("Walk", false);
        networkAnimator.Animator.SetBool("Run", false);
    }
}
