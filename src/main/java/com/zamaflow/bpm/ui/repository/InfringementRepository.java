package com.zamaflow.bpm.ui.repository;

import com.zamaflow.bpm.ui.domain.Infringement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Infringement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InfringementRepository extends JpaRepository<Infringement, Long> {
}
