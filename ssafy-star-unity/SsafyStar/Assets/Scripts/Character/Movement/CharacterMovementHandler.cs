using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public class CharacterMovementHandler : NetworkBehaviour
{
    NetworkCharacterControllerPrototypeCustom networkCharacterControllerPrototypeCustom;

    private void Awake()
    {
        networkCharacterControllerPrototypeCustom = GetComponent<NetworkCharacterControllerPrototypeCustom>();
    }

    private void Start()
    {
        
    }

    //���� ������Ʈ
    private void Update()
    {
        
    }

    //��Ʈ��ũ ������Ʈ
    public override void FixedUpdateNetwork()
    {
        // ��Ʈ��ũ�κ��� �Է� �� ������
        if (GetInput(out NetworkInputData networkInputData))
        {
            //Vector3 moveDirection = transform.forward * networkInputData.movementInput.y + transform.right * networkInputData.movementInput.x;
            Vector3 moveDirection = new Vector3(networkInputData.movementInput.y, 0f, networkInputData.movementInput.x).normalized;
            moveDirection.Normalize();

            networkCharacterControllerPrototypeCustom.Move(moveDirection);
        }
    }
}
