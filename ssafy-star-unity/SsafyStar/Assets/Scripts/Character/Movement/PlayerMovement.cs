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
    public bool goCloth = false;
    public bool doRespawn = false;
    public bool doRespawnCloth = false;
    public Transform respawnPos;
    public Transform respawnPosCloth;
    public Transform museumPos;
    public Transform clothPos;
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
            playerSpeed = playerwalkSpeed;

            cameraControl = GetComponent<CameraControl>();
            cameraControl.InitiateCamera(transform.Find("InterpolationTarget"));
            GameObject.Find("MinimapCamera").GetComponent<CopyPosition>().target = transform;

            nickName = PlayerPrefs.GetString("Nickname");
            RPC_SetNickname(nickName.ToString());

            GameObject.Find("UIMenu").GetComponent<UIManager>().SetVisibleTrue();
            GameObject.Find("UIMenu").GetComponent<EmotionAnimation>().networkAnimator = GetComponent<NetworkMecanimAnimator>();
            GameObject.Find("ChatRPC").GetComponent<ChatController>().player = this.gameObject.GetComponent<PlayerMovement>();

            respawnPos = GameObject.Find("SpawnPos").transform;
            museumPos = GameObject.Find("MuseumPos").transform;
            clothPos = GameObject.Find("ClothPos").transform;
            respawnPosCloth = GameObject.Find("SpawnPosCloth").transform;

            GetComponent<ChangeCharacter>().RPCDoChange(Random.Range(1,22));
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

        if (HasStateAuthority == false)
        {
            return;
        }

        if (Input.GetButtonDown("Jump"))
        {
            if (chatActive)
            {
                if (!HasInputAuthority) return;
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

        //if(Input.GetKeyDown(KeyCode.E))
        //{
        //    if (chatActive)
        //    {
        //        if (!HasInputAuthority) return;
        //        if (Vector3.Distance(transform.position, NPC.transform.position) > chatDistance) return;

        //        NPC.GetComponent<NPC>().player = gameObject;
        //        NPC.gameObject.GetComponent<NPC>().doChat = true;
        //        cameraControl.NPCPriority(transform);

        //        stop = true;
        //        isChatting = true;

        //        return;
        //    }
        //}

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
            //Debug.Log("r ´©¸§");
            doRespawn = true;
        }

        if (Input.GetMouseButtonDown(0))
        {
            if (!Camera) return;
            RaycastHit hit;
            Ray ray = Camera.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast(ray, out hit))
            {
                if (hit.collider.gameObject.tag == "NPC")
                {
                    if (Vector3.Distance(transform.position, hit.collider.transform.position) > chatDistance) return;

                    hit.collider.gameObject.GetComponent<NPC>().player = gameObject;
                    hit.collider.gameObject.GetComponent<NPC>().doChat = true;
                    if(cameraControl) cameraControl.NPCPriority(transform);

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
            //ResetEmotionAnimation();
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

        if (doRespawnCloth)
        {
            transform.position = respawnPosCloth.position;
            doRespawnCloth = false;
        }

        if (goMuseum)
        {
            transform.position = museumPos.position;
            goMuseum = false;
        }
        
        if (goCloth)
        {
            transform.position = clothPos.position;
            goCloth = false;
        }
    }

    //private void EmotionAnimation()
    //{
    //    if(Input.GetKeyDown(KeyCode.F))
    //    {
    //        networkAnimator.Animator.SetBool("Dance2", true);
    //    }
    //    if (Input.GetKeyDown(KeyCode.H))
    //    {
    //        networkAnimator.Animator.SetBool("Waving", true);
    //    }
    //    if (Input.GetKeyDown(KeyCode.G))
    //    {
    //        networkAnimator.Animator.SetBool("Joyful", true);
    //    }
    //    if (Input.GetKeyDown(KeyCode.J))
    //    {
    //        networkAnimator.Animator.SetBool("Praying", true);
    //    }
    //}

    //private void ResetEmotionAnimation()
    //{
    //    networkAnimator.Animator.SetBool("Dance2", false);
    //    networkAnimator.Animator.SetBool("Waving", false);
    //    networkAnimator.Animator.SetBool("Joyful", false);
    //    networkAnimator.Animator.SetBool("Praying", false);
    //}

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
        if (other.gameObject.tag.Equals("goCloth"))
        {
            goCloth = true;
        }
        else if (other.gameObject.tag.Equals("backCloth"))
        {
            doRespawnCloth = true;
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
        //Debug.Log($"[RPC] SetNickname {nickname}");
        textPlayerNickname.text = nickname;
        gameObject.name = "Player_" + nickname;
    }

    private void ResetAnimation()
    {
        networkAnimator.Animator.SetBool("Walk", false);
        networkAnimator.Animator.SetBool("Run", false);
    }
}
