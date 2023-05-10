using Fusion;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;
using Cinemachine;
using UnityEngine.UIElements;

public class NPC : MonoBehaviour
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
    public bool doChat = false;
    public GameObject player;

    [Header("Ink Json")]
    [SerializeField]
    private TextAsset inkJSON;

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
            GameObject.Find("UIMenu").GetComponent<UIDocument>().rootVisualElement.visible = false ;
            chatUI.SetActive(true);
            //Debug.Log(inkJSON.text);
            DialogueManager.GetInstance().NPC = gameObject;
            DialogueManager.GetInstance().EnterDialogueMode(inkJSON);

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
            return hit.position;
        }

        return transform.position;
    }

    public void FinishChat()
    {
        chatUI.SetActive(false);
        GameObject.Find("UIMenu").GetComponent<UIDocument>().rootVisualElement.visible = true;

        navMeshAgent.isStopped = false;
        player.GetComponent<CameraControl>().SetMainCameraPriorityHigh();
        StartCoroutine(ResetPlayer());

        doChat = false;
    }

    private IEnumerator ResetPlayer()
    {
        yield return new WaitForSeconds(2f);
        player.GetComponent<PlayerMovement>().stop = false;
    }
}
