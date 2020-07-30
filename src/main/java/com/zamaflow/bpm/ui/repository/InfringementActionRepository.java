package com.zamaflow.bpm.ui.repository;

import com.zamaflow.bpm.ui.domain.InfringementAction;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InfringementAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InfringementActionRepository extends JpaRepository<InfringementAction, Long> {
}
