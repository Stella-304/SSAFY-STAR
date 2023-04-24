using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public struct NetworkInputData : INetworkInput
{
    //=====��Ʈ ������ ����(���� ����)=====

    public Vector2 movementInput;// �̵� �Է� ��
    public float rotationInput;// ȸ�� �Է� ��
    public NetworkBool isJumpPressed;// ���� �Է� ����

}
