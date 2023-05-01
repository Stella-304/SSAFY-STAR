using Fusion;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using Unity.Services.Analytics.Internal;
using UnityEngine;
using UnityEngine.AI;

public class NPC : NetworkBehaviour
{
    public float moveSpeed = 5f;
    public float rotationSpeed = 5f;
    public Vector3 startPosition = Vector3.zero;

    private NavMeshAgent navMeshAgent;
    private Vector3 targetPosition;
    private bool isMoving = false;

    private GameObject chatUI;
    public bool doChat = false;
    

    private void Start()
    {
        navMeshAgent = GetComponent<NavMeshAgent>();
        targetPosition = GetRandomPosition();
        chatUI = GameObject.Find("Canvas").transform.Find("NPCChat").gameObject;
    }

    private void Update()
    {
        if(doChat)
        {
            chatUI.SetActive(true);
        }
    }

    public override void FixedUpdateNetwork()
    {
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
}
