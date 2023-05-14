using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using TMPro;
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

    [Header("Chat")]
    private float chatDistance = 3f;
    private bool chatActive = false;
    private GameObject NPC;
    public bool isChatting = false;

    [Networked]
    public NetworkString<_16> nickName { get; set; }

    [SerializeField]
    private TMP_Text textPlayerNickname;

    public bool goMuseum = false;
    public bool doRespawn = false;
    public Transform respawnPos;
    public Transform museumPos;
    public Transform interpolationPos;

    [Header("Camera")]
    public Camera Camera;
    private CameraControl cameraControl;
    public FaceCamera faceCamera;

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
            Debug.Log(gameObject.name + "내가 들어옴");

            playerSpeed = playerwalkSpeed;

            cameraControl = GetComponent<CameraControl>();
            cameraControl.InitiateCamera(transform.Find("InterpolationTarget"));
            GameObject.Find("MinimapCamera").GetComponent<CopyPosition>().target = transform;

            nickName = PlayerPrefs.GetString("Nickname");
            RPC_SetNickname(nickName.ToString());

            GameObject.Find("UIMenu").GetComponent<UIManager>().SetVisibleTrue();
            GameObject.Find("ChatRPC").GetComponent<ChatController>().player = this.gameObject.GetComponent<PlayerMovement>();

            respawnPos = GameObject.Find("SpawnPos").transform;
            museumPos = GameObject.Find("MuseumPos").transform;
        }
        else
        {
            if (textPlayerNickname.text == "Player")
            {
                RPC_SetNickname(nickName.ToString());
            }
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
            if (chatActive)
            {
                if (Vector3.Distance(transform.position, NPC.transform.position) > chatDistance) return;

                NPC.GetComponent<NPC>().player = gameObject;
                NPC.gameObject.GetComponent<NPC>().doChat = true;
                cameraControl.NPCPriority(transform);

                stop = true;
                isChatting = true;

                return;
            }

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

        if (Input.GetKeyDown(KeyCode.R))
        {
            Debug.Log("r 누름");
            doRespawn = true;
        }

        if (Input.GetMouseButtonDown(0))
        {
            RaycastHit hit;
            Ray ray = Camera.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast(ray, out hit))
            {
                if (hit.collider.gameObject.tag == "NPC")
                {
                    if (Vector3.Distance(transform.position, hit.collider.transform.position) > chatDistance) return;

                    hit.collider.gameObject.GetComponent<NPC>().player = gameObject;
                    hit.collider.gameObject.GetComponent<NPC>().doChat = true;
                    cameraControl.NPCPriority(transform);

                    stop = true;
                    isChatting = true;
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

        if (goMuseum)
        {
            transform.position = museumPos.position;
            goMuseum = false;
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag.Equals("goMuseum"))
        {
            goMuseum = true;
        }
        else if (other.gameObject.tag.Equals("backMuseum"))
        {
            doRespawn = true;
        }
        else if (other.gameObject.tag.Equals("NPC"))
        {
            NPC = other.gameObject;
            chatActive = true;
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.gameObject.tag.Equals("NPC"))
        {
            chatActive = false;
            NPC = null;
        }
    }

    //[Rpc(RpcSources.All, RpcTargets.All)]
    public void RPC_SetNickname(string nickname, RpcInfo info = default)
    {
        Debug.Log($"[RPC] SetNickname {nickname}");
        textPlayerNickname.text = nickname;
    }

    private void ResetAnimation()
    {
        networkAnimator.Animator.SetBool("Walk", false);
        networkAnimator.Animator.SetBool("Run", false);
    }
}
