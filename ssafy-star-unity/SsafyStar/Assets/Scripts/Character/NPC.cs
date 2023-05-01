using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NPC : MonoBehaviour
{
    public float moveSpeed = 5f;
    public float rotationSpeed = 5f;
    public Vector3 startPosition = Vector3.zero;

    private Vector3 randomDirection;
    private bool isMoving = false;

    private void Start()
    {
        // Start with a random direction
        randomDirection = Random.insideUnitSphere;
        randomDirection.y = 0f;
    }

    private void Update()
    {
        if (!isMoving)
        {
            // If not already moving, start moving in a new random direction
            StartCoroutine(MoveInRandomDirection());
        }
        else
        {
            // Move towards the random direction
            transform.position += randomDirection * moveSpeed * Time.deltaTime;

            // Rotate towards the movement direction
            if (randomDirection != Vector3.zero)
            {
                Quaternion targetRotation = Quaternion.LookRotation(randomDirection);
                transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
            }
        }
    }

    private IEnumerator MoveInRandomDirection()
    {
        // Wait for a random time before changing direction again
        float waitTime = Random.Range(1f, 5f);
        yield return new WaitForSeconds(waitTime);

        // Generate a new random direction
        randomDirection = Random.insideUnitSphere;
        randomDirection.y = 0f;

        // Set moving flag to true
        isMoving = true;
    }
}
