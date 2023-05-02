using Fusion;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;
using Cinemachine;
using UnityEngine.UIElements;

public class NPC : NetworkBehaviour
{
    [Header("Move")]
    public float moveSpeed = 5f;
    public float rotationSpeed = 5f;
    public Vector3 startPosition = Vector3.zero;

    private NavMeshAgent navMeshAgent;
    private Vector3 targetPosition;
    private bool isMoving = false;

    [Header("Chat")]
    private GameObject chatUI;
    private VisualElement squareUI;
    //private GameObject squareUI;
    public bool doChat = false;
    public GameObject player;

    private void Start()
    {
        navMeshAgent = GetComponent<NavMeshAgent>();
        targetPosition = GetRandomPosition();
        chatUI = GameObject.Find("Canvas").transform.Find("NPCChat").gameObject;
    }

    public override void Spawned()
    {
        squareUI = GameObject.Find("UIMenu").GetComponent<UIDocument>().rootVisualElement;
    }

    private void Update()
    {
        if(doChat)
        {
            squareUI.visible = false;
            chatUI.SetActive(true);
        }
    }

    public override void FixedUpdateNetwork()
    {
        if (doChat)
        {
            transform.LookAt(player.transform);
            navMeshAgent.isStopped = true;
            doChat = false;
            return;
        }

        if (!isMoving)
        {
            navMeshAgent.SetDestination(targetPosition);
            isMoving = true;
        }
        else
        {
            if (navMeshAgent.remainingDistance <= navMeshAgent.stoppingDistance)
            {
                isMoving = false;
                targetPosition = GetRandomPosition();
            }
        }
    }

    Vector3 GetRandomPosition()
    {
        NavMeshHit hit;
        Vector3 randomPosition = transform.position + Random.insideUnitSphere * 10f;
        if (NavMesh.SamplePosition(randomPosition, out hit, 10f, NavMesh.AllAreas))
        {
            Debug.Log(hit.position);
            return hit.position;
        }

        return transform.position;
    }

    public void FinishChat()
    {
        doChat = false;

        chatUI.SetActive(false);
        squareUI.visible = true;

        navMeshAgent.isStopped = false;
        player.GetComponent<CameraControl>().SetMainCameraPriorityHigh();
        player.GetComponent<PlayerMovement>().stop = false;
    }
}
