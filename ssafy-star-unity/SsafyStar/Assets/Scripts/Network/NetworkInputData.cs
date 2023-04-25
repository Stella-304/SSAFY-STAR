using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public enum EGameplayInputAction
{
    LMB = 0,
    RMB = 1,
    MMB = 2,
    Jump = 3,
    Dash = 4,
    Sprint = 5,
    LeftTrigger = 6,
    RightTrigger = 7,
}

public struct NetworkInputData : INetworkInput
{
    //=====비트 단위가 좋음=====
    public Vector2 movementInput;// 이동 입력 값
    public float rotationInput;// 회전 입력 값
    public NetworkBool isJumpPressed;// 점프 입력 유무

    public Vector2 MoveDirection;
    public Vector2 LookRotationDelta;
    public NetworkButtons Actions;

    public bool LMB { get { return Actions.IsSet(EGameplayInputAction.LMB); } set { Actions.Set(EGameplayInputAction.LMB, value); } }
    public bool RMB { get { return Actions.IsSet(EGameplayInputAction.RMB); } set { Actions.Set(EGameplayInputAction.RMB, value); } }
    public bool MMB { get { return Actions.IsSet(EGameplayInputAction.MMB); } set { Actions.Set(EGameplayInputAction.MMB, value); } }
    public bool Jump { get { return Actions.IsSet(EGameplayInputAction.Jump); } set { Actions.Set(EGameplayInputAction.Jump, value); } }
    public bool Dash { get { return Actions.IsSet(EGameplayInputAction.Dash); } set { Actions.Set(EGameplayInputAction.Dash, value); } }
    public bool Sprint { get { return Actions.IsSet(EGameplayInputAction.Sprint); } set { Actions.Set(EGameplayInputAction.Sprint, value); } }
    public bool LeftTrigger { get { return Actions.IsSet(EGameplayInputAction.LeftTrigger); } set { Actions.Set(EGameplayInputAction.LeftTrigger, value); } }
    public bool RightTrigger { get { return Actions.IsSet(EGameplayInputAction.RightTrigger); } set { Actions.Set(EGameplayInputAction.RightTrigger, value); } }
}
