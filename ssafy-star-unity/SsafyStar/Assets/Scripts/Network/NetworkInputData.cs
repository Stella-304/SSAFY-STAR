using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public struct NetworkInputData : INetworkInput
{
    //=====비트 단위가 좋음(추후 수정)=====

    public Vector2 movementInput;// 이동 입력 값
    public float rotationInput;// 회전 입력 값
    public NetworkBool isJumpPressed;// 점프 입력 유무

}
