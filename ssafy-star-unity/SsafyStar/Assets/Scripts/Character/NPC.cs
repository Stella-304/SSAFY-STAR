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
    Vector3 targetPosition;
    bool isMoving = false;

    private void Start()
    {
        navMeshAgent = GetComponent<NavMeshAgent>();
        targetPosition = GetRandomPosition();
    }

    public override void FixedUpdateNetwork()
    {
        if (!isMoving)
        {
            // Start moving towards the target position
            navMeshAgent.SetDestination(targetPosition);
            isMoving = true;
        }
        else
        {
            // Check if the object has reached the target position
            if (navMeshAgent.remainingDistance <= navMeshAgent.stoppingDistance)
            {
                // Stop moving and set a new target position
                isMoving = false;
                targetPosition = GetRandomPosition();
            }
        }
    }

    Vector3 GetRandomPosition()
    {
        // Get a random point on the NavMesh
        NavMeshHit hit;
        Vector3 randomPosition = transform.position + Random.insideUnitSphere * 10f;
        if (NavMesh.SamplePosition(randomPosition, out hit, 10f, NavMesh.AllAreas))
        {
            Debug.Log(hit.position);
            return hit.position;
        }
        // If no point on NavMesh found, return current position


        return transform.position;
    }
}
