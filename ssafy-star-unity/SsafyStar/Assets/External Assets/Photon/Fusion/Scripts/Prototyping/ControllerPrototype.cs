
using UnityEngine;
using Fusion;

[ScriptHelp(BackColor = EditorHeaderBackColor.Steel)]
public class ControllerPrototype : Fusion.NetworkBehaviour, Fusion.IPlayerLeft
{
    public static ControllerPrototype Local { get; protected set; }

    protected NetworkCharacterControllerPrototype _ncc;
    protected NetworkRigidbody _nrb;
    protected NetworkRigidbody2D _nrb2d;
    protected NetworkTransform _nt;

    [Header("Animation")]
    public Animator characterAnimator;

    [Networked]
    public Vector3 MovementDirection { get; set; }

    public bool TransformLocal = false;

    [DrawIf(nameof(ShowSpeed), Hide = true)]
    public float Speed = 6f;

    bool ShowSpeed => this && !TryGetComponent<NetworkCharacterControllerPrototype>(out _);

    public void Awake()
    {
        CacheComponents();
    }

    public override void Spawned()
    {
        if (Object.HasInputAuthority)
        {
            Local = this;

            MapController mapController = GameObject.Find("UIMenu").GetComponent<MapController>();
            mapController.player = this.gameObject;
            Debug.Log("맵에 플레이어 추가");
        }

        Debug.Log("Spawned 캐릭터 생성됨");

        CacheComponents();
    }

    private void CacheComponents()
    {
        if (!_ncc) _ncc = GetComponent<NetworkCharacterControllerPrototype>();
        if (!_nrb) _nrb = GetComponent<NetworkRigidbody>();
        if (!_nrb2d) _nrb2d = GetComponent<NetworkRigidbody2D>();
        if (!_nt) _nt = GetComponent<NetworkTransform>();
    }

    public override void FixedUpdateNetwork()
    {
        if (Runner.Config.PhysicsEngine == NetworkProjectConfig.PhysicsEngines.None)
        {
            return;
        }

        Vector3 direction;
        if (GetInput(out NetworkInputPrototype input))
        {
            direction = default;

            if (input.IsDown(NetworkInputPrototype.BUTTON_FORWARD))
            {
                direction += TransformLocal ? transform.forward : Vector3.forward;
            }

            if (input.IsDown(NetworkInputPrototype.BUTTON_BACKWARD))
            {
                direction -= TransformLocal ? transform.forward : Vector3.forward;
            }

            if (input.IsDown(NetworkInputPrototype.BUTTON_LEFT))
            {
                direction -= TransformLocal ? transform.right : Vector3.right;
            }

            if (input.IsDown(NetworkInputPrototype.BUTTON_RIGHT))
            {
                direction += TransformLocal ? transform.right : Vector3.right;
            }

            direction = direction.normalized;

            MovementDirection = direction;

            if (input.IsDown(NetworkInputPrototype.BUTTON_JUMP))
            {
                if (_ncc)
                {
                    _ncc.Jump();
                }
                else
                {
                    direction += (TransformLocal ? transform.up : Vector3.up);
                }
            }
        }
        else
        {
            direction = MovementDirection;
        }

        Vector2 walkVector = new Vector2(direction.x, direction.z);
        walkVector.Normalize();
        float walkSpeed = Mathf.Clamp01(walkVector.magnitude);
        characterAnimator.SetFloat("WalkSpeed", walkSpeed);

        if (_ncc)
        {
            _ncc.Move(direction);
        }
    }

    public void PlayerLeft(PlayerRef player)
    {
        //로컬 플레이어라면
        if (player == Object.InputAuthority)
        {
            //스폰해제 하기
            Runner.Despawn(Object);
        }
    }

}